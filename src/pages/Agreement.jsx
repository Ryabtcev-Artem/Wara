import usePageTitle from "../assets/hooks/usePageTitle"
import AgreementInfo from "../assets/components/AgreementInfo"
export default function Home(){
    usePageTitle('Wara Пользовательское соглашение')
    return (
        <>
            <AgreementInfo />
        </>
    )
}