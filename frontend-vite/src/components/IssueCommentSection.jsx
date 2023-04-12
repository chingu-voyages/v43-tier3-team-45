
export const IssueCommentSection = ( {data} ) => {

    return (
        <div>
         {data.text}, {data.createdBy.email}
        </div>
    )

}
