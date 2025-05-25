import CreatePost from "../assets/components/CreatePost"
import usePageTitle from "../assets/hooks/usePageTitle"
import AllPosts from "../assets/components/AllPosts"
export default function Home(){
    usePageTitle('Wara Главная')
    return (
        <>
            <CreatePost />
            <AllPosts />
        </>
    )
}