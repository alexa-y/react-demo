module Api::V1::Post
  include Api::V1::Comment
  include Api::V1::Json

  def post_json(post, includes = [])
    api_json(post).tap do |hash|
      hash[:comments] = comments_json(post.comments) if includes.include?('comments')
    end
  end

  def posts_json(posts)
    posts.map { |p| post_json(p) }
  end

end
