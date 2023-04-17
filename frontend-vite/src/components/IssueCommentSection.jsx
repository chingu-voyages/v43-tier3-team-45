import Avatar from "./Avatar"
export const IssueCommentSection = ( {data} ) => {
console.log("data ICS", data.createdBy.avatarUrl)

    let user = data.createdBy
    let comment = data.text
    
    return (
        <div class="flow-root">
            <Avatar 
                class="float-center"
                src={user.avatarUrl}
                alt={user.firstName}
                size={10}
            />
            <p className="text-sky-400">{user.firstName}</p>
            <p className="float-center font-size: 1.25rem">
                {comment}
            </p>
        </div>
    )

}
