module Api::V1::Comment
  include Api::V1::Json

  def comment_json(comment)
    api_json(comment)
  end

  def comments_json(comments)
    comments.map { |c| comment_json(c) }
  end
end
