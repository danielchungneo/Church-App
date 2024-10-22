import useCrudRequest from '@/hooks/useCrudRequest';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import { Box, Button, ButtonText, KeyboardAvoidingView, ScrollView, VStack } from '@gluestack-ui/themed';
import api from '@/constants/api';
import ControlledTextInput from '../FormInputs/Controlled/ControlledTextInput';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import ControlledSelect from '../FormInputs/Controlled/ControlledSelect';
import useGetRequest from '@/hooks/useGetRequest';
import MainContainer from '../MainContainer';
import ControlledMultiSelect from '../FormInputs/Controlled/ControlledMultiSelect';
import ControlledImageSelect from '../FormInputs/Controlled/ControlledImageSelect';
import { useEffect, useRef } from 'react';
import AddQueuedRoutesButton from '../AddQueuedRoutesButton';

// Field definitions
const FORM_FIELDS = {
    NAME: 'name',
    GRADE_ID: 'gradeId',
    ROUTE_TYPE_ID: 'routeTypeId',
    ROUTE_LOCATION_ID: 'routeLocationId',
    ROUTE_COLOR_ID: 'routeColorId',
    ROUTE_STATUS_ID: 'routeStatusId',
    POINT_VALUE: 'pointValue',
    SETTER_ID: 'setterId',
    IMAGE_URI: 'imageUri',
    IMAGE_DETAILS: 'imageDetails',
    ROUTE_TAG_IDS: 'routeTagIds',
};

// Form Validation
const formValidationSchema = Yup.object({
    [FORM_FIELDS.NAME]: Yup.string().nullable(),
    [FORM_FIELDS.GRADE_ID]: Yup.number().required(),
    [FORM_FIELDS.ROUTE_TYPE_ID]: Yup.number().required(),
    [FORM_FIELDS.ROUTE_LOCATION_ID]: Yup.number().nullable(),
    [FORM_FIELDS.ROUTE_COLOR_ID]: Yup.number().required(),
    [FORM_FIELDS.ROUTE_STATUS_ID]: Yup.number().required(),
    [FORM_FIELDS.POINT_VALUE]: Yup.number().nullable(),
    [FORM_FIELDS.SETTER_ID]: Yup.string().nullable(),
    [FORM_FIELDS.IMAGE_URI]: Yup.string().nullable(),
    [FORM_FIELDS.IMAGE_DETAILS]: Yup.object().nullable(),
    [FORM_FIELDS.ROUTE_TAG_IDS]: Yup.array().nullable(),
});

// Prop Typescript
type RouteFormProps = {
    activeObject?: any;
    id: string | string[];
    revalidateCache?: () => void;
    onCancel?: () => void;
    onSuccess?: (response: any) => void;
    showToast?: boolean;
    isMultiRoute?: boolean;
    isQueuedEdit?: boolean;
};

function RouteForm({
    activeObject: Routes,
    id,
    revalidateCache,
    onCancel: onFormCancel,
    onSuccess: onFormSuccess,
    showToast = true,
    isMultiRoute = false,
    isQueuedEdit = false,
}: RouteFormProps) {
    const { activeGymId, activeTenantId } = useAuth();
    const defaultValues = isMultiRoute ? { gymId: activeGymId, routeTagIds: [], routeStatusId: 2 } : { gymId: activeGymId, routeTagIds: [] }


    // API Calls
    const {
        data: saveData,
        loading: saving,
        errors: savingErrors,
        submitRequest: saveRoute,
    } = useCrudRequest(api.routes.save(id), {
        onSuccess,
        onError,
    });

    // API GET for options
    const { data: routesCount, loading: routesLoading, mutate: revalidateCount } = useGetRequest(api.routes.getRoutesCount({
        query: {
            filter: [
                { field: 'gymId', value: activeGymId, opperand: 'equals' },
                { field: 'routeStatusId', value: 2, opperand: 'equals' },
            ],
        },
    }));

    const { data: grades, loading: gradesLoading } = useGetRequest(api.grades.getAll({
        query: {
            filter: [
                { field: 'gymId', value: activeGymId, opperand: 'equals' },
            ],
        },
    }));
    const { data: routeTypes, loading: routeTypesLoading } = useGetRequest(api.routeTypes.getAll({
        query: {
            filter: [
                { field: 'gymId', value: activeGymId, opperand: 'equals' },
            ],
        },
    }));
    const { data: routeLocations, loading: routeLocationsLoading } = useGetRequest(api.routeLocations.getAll({
        query: {
            filter: [
                { field: 'gymId', value: activeGymId, opperand: 'equals' },
            ],
        },
    }));
    const { data: routeColors, loading: routeColorsLoading } = useGetRequest(api.routeColors.getAll({
        query: {
            filter: [
                { field: 'gymId', value: activeGymId, opperand: 'equals' },
            ],
        },
    }));
    const { data: routeTags, loading: routeTagsLoading } = useGetRequest(api.routeTags.getAll({
        query: {
            filter: [
                { field: 'gymId', value: activeGymId, opperand: 'equals' },
            ],
        },
    }));
    const { data: routeStatuses, loading: routeStatusesLoading } = useGetRequest(api.routeStatuses.getAll());
    const { data: setters, loading: settersLoading } = useGetRequest(api.users.getSetters({
        query: { tenantId: activeTenantId }
    }));

    const formMethods = useForm({
        resolver: yupResolver(formValidationSchema),
        defaultValues: id === 'create' ? defaultValues : Routes || defaultValues,
    });

    const {
        handleSubmit,
        register,
        formState: { errors: formErrors, isDirty },
        reset,
        watch,
        setValue,
        getValues,
        control,
    } = formMethods;

    function onCancel() {
        onFormCancel?.();
    }

    function onError(response: any) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Error saving changes.'

        })
    }

    function onSubmit(values: any) {
        saveRoute(values);
    }

    async function onSuccess(response: any) {
        await revalidateCache?.();
        if (isMultiRoute) {
            revalidateCount();
            reset(defaultValues);
        } else {
            if (showToast) {
                Toast.show({
                    type: 'success',
                    text1: 'Form Saved',
                    text2: 'Form changes have been saved.'
                })
            }
            if (onFormSuccess) {
                onFormSuccess?.(response);
            } else {
                isQueuedEdit ? router.dismiss() : router.back();
            }
        }
    }
    const loading = gradesLoading || routeTypesLoading || routeLocationsLoading || routeColorsLoading || routeStatusesLoading || routeTagsLoading || settersLoading;

    const renderColorOptionIcon = (option: any) => {
        return (
            <Box
                style={{
                    width: 20,
                    height: 20,
                    backgroundColor: option.colorCode,
                    borderRadius: 10,
                    marginRight: 10,
                }}
            />
        );
    }
    const watchGrade = watch(FORM_FIELDS.GRADE_ID);

    useEffect(() => {
        if (watchGrade && isDirty) {
            const defaultPointValue = grades.find((grade: any) => grade.gradeId === watchGrade)?.defaultPointValue
            setValue(FORM_FIELDS.POINT_VALUE, defaultPointValue)
        }
    }, [watchGrade])

    if (loading) {
        return <MainContainer loading={loading} />
    }

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} flex={1} style={{ flex: 1 }}>
            <FormProvider {...formMethods}>
                <ScrollView bounces={false} flex={1}>
                    <VStack space='lg' paddingBottom={"$24"}>
                        <ControlledImageSelect label="Route Picture" uriName={FORM_FIELDS.IMAGE_URI} imageDetailName={FORM_FIELDS.IMAGE_DETAILS} />
                        {/* <ControlledTextInput name={FORM_FIELDS.NAME} label='Route Name' /> */}
                        <ControlledSelect
                            name={FORM_FIELDS.ROUTE_TYPE_ID}
                            data={routeTypes}
                            loading={routeTypesLoading}
                            placeholder='Select Route Type'
                            labelField='name'
                            valueField="routeTypeId"
                            search={false}
                            label="Route Type"
                        />
                        <ControlledSelect
                            name={FORM_FIELDS.GRADE_ID}
                            data={grades}
                            loading={gradesLoading}
                            placeholder='Select Grade'
                            labelField='name'
                            valueField="gradeId"
                            search={false}
                            label="Grade"
                        />
                        <ControlledSelect
                            name={FORM_FIELDS.ROUTE_LOCATION_ID}
                            data={routeLocations}
                            loading={routeLocationsLoading}
                            placeholder='Select Route Location'
                            labelField='name'
                            valueField="routeLocationId"
                            search={false}
                            label="Route Location"
                        />
                        <ControlledSelect
                            name={FORM_FIELDS.ROUTE_COLOR_ID}
                            data={routeColors}
                            loading={routeColorsLoading}
                            placeholder='Select Route Color'
                            labelField='name'
                            valueField="routeColorId"
                            search={false}
                            label="Route Color"
                            renderOptionIcon={renderColorOptionIcon}
                        />
                        {!isMultiRoute && (
                            <ControlledSelect
                                name={FORM_FIELDS.ROUTE_STATUS_ID}
                                data={routeStatuses}
                                loading={routeStatusesLoading}
                                placeholder='Select Route Status'
                                labelField='name'
                                valueField="routeStatusId"
                                search={false}
                                label="Route Status"
                            />
                        )}
                        <ControlledMultiSelect
                            name={FORM_FIELDS.ROUTE_TAG_IDS}
                            data={routeTags}
                            loading={routeTagsLoading}
                            placeholder='Select Route Tags'
                            labelField='name'
                            valueField="routeTagId"
                            search={false}
                            label="Route Tags"
                        />
                        <ControlledSelect
                            name={FORM_FIELDS.SETTER_ID}
                            data={setters}
                            loading={settersLoading}
                            placeholder='Select Route Setter'
                            labelField='fullName'
                            valueField="id"
                            search={false}
                            label="Route Setter"
                        />

                        <ControlledTextInput name={FORM_FIELDS.POINT_VALUE} label='Point Value' isNumber />

                    </VStack>
                </ScrollView>
                <Box my='$6'>
                    <Button action='positive' onPress={handleSubmit(onSubmit)} disabled={saving} variant={saving ? 'outline' : 'solid'}>
                        <ButtonText>{saving ? 'Saving...' : 'Save'}</ButtonText>
                    </Button>
                    {isMultiRoute && (
                        <Box mt="$4">
                            <AddQueuedRoutesButton routesCount={routesCount} />
                        </Box>
                    )}
                </Box>
            </FormProvider>
        </KeyboardAvoidingView>
    );
}

export default RouteForm;