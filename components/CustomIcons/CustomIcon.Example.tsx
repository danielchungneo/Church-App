import RouteSentIconSvg from "@/assets/images/route-sent.svg";

type RouteSentIconProps = {
        color: string;
    };

    function RouteSentIcon({color}: RouteSentIconProps) {
        return (
            <RouteSentIconSvg style={{ color }} />
        );
}

export default RouteSentIcon;