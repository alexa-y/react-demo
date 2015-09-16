module Api::V1::Post
  include Api::V1::Json

  def post_json(post)
    api_json(post)
  end

  def posts_json(posts)
    posts.map { |p| post_json(p) }
  end

end
