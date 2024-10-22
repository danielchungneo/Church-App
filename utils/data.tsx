import { useAuth } from "@/context/AuthContext"

export const formatMultiSelectOptions = (data: any, labelField: string, valueField: string) => {
    return data.map((item: any) => {
        return {
            label: item[labelField],
            value: item[valueField]
        }
    })
}

export const formatUsersName = ((user: any) => {
    if (!user) return null
    return `${user.firstName} ${user.lastName}`
})


function convertUTCDateToLocalDate(utcDate: string) {
    var newDate = new Date(utcDate);
    var offset = newDate.getTimezoneOffset() / 60;
    var hours = newDate.getHours();
    newDate.setHours(hours - offset);
    return newDate;
}

export const getHowLongAgoTimeStampWas = (utcDate: string) => {
    const date = convertUTCDateToLocalDate(utcDate)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const diffInMinutes = Math.round(diff / 60000)
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`
    } else if (diffInMinutes < 1440) {
        return `${Math.round(diffInMinutes / 60)} hours ago`
    } else {
        return `${Math.round(diffInMinutes / 1440)} days ago`
    }
}


export const hasUserRoles = (expectedRoleIds: Array<string>) => {
    const { sessionInfo } = useAuth()
    if (!sessionInfo) {
        return false;
    }
    const userRoleId = sessionInfo.roleId
    return expectedRoleIds.includes(userRoleId)
}

type AuthorizePageProps = {
    children: React.ReactNode;
    // If the user has one of these roles, they can access the page
    accessRoles?: string[];
};

export const AuthorizeComponent = ({ accessRoles, children }: AuthorizePageProps) => {
    if (!hasUserRoles(accessRoles || [])) {
        return null
    }

    return (
        <>
            {children}
        </>
    )
}

export const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString()
}

export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString()
}