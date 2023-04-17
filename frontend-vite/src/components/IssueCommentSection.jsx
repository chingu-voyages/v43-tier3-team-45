import Avatar from "./Avatar"
export const IssueCommentSection = ( {data} ) => {
console.log("data ICS", data.createdBy.avatarUrl)

    let user = data.createdBy
    
    return (
        <div>
            <Avatar 
            src={user.avatarUrl}
            alt={user.firstName}
            size={12}
            />
            <div>
            {data.text}
            </div>
        </div>
    )

}
