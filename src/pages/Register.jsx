import usePageTitle from "../assets/hooks/usePageTitle"
import RegisterForm from "../assets/components/RegisterForm"
export default function Home(){
    usePageTitle('Wara Регистрация')
    return (
        <>
            <RegisterForm />
        </>
    )
}