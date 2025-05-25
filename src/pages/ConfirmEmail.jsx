import usePageTitle from "../assets/hooks/usePageTitle"
import Confirming from "../assets/components/Confirming"
export default function confirmEmail(){
    usePageTitle('Wara Подтверждение Email')
    return (
        <>
            <Confirming />
        </>
    )
}