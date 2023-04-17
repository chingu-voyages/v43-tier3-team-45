
export const IssuePostComment = ({setNewComment}) => {

    return (
        <div className="mb-2">
            <label>
                  <span class="text-gray-200">Comment:</span>
                  <textarea
                    name="message"
                    // value={comment}
                    // move this to another component
                    style={{ fontSize: "18px" }}
                    className="
                        block
                        w-full
                        mt-2 px-3 py-3
                        border-gray-300
                        rounded-md
                        shadow-sm
                        focus:border-indigo-300
                        focus:ring
                        focus:ring-indigo-200
                        focus:ring-opacity-50
                      "
                    rows="3"
                    onChange={(e) => setNewComment(e.target.value)}
                  ></textarea>
            </label>
            <div class="mb-6">
              {/* <button
                type="submit"
                className="
                      h-10
                      px-5
                      text-indigo-100
                      bg-indigo-700
                      rounded-lg
                      transition-colors
                      duration-150
                      focus:shadow-outline
                      hover:bg-indigo-800
                      "
                onClick={(e) => handlePost(e)}
              >
                Post
              </button> */}
            </div>
        </div>
    )

}
