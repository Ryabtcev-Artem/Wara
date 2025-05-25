import usePageTitle from "../assets/hooks/usePageTitle"
import CreateNewPost from "../assets/components/CreateNewPost"
import NewPostHeader from "../assets/components/NewPostHeader"
export default function NewPost(){
    usePageTitle('Wara Новый Пост')
    return (
        <>
            <NewPostHeader />
            <CreateNewPost />
        </>
    )
}