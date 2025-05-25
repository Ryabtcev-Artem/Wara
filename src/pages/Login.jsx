import usePageTitle from "../assets/hooks/usePageTitle"
import LoginForm from "../assets/components/LoginForm"
export default function Home(){
    usePageTitle('Wara Вход')
    return (
        <>
            <LoginForm />
        </>
    )
}