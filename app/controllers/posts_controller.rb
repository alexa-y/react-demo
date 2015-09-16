class PostsController < ApplicationController
  include Api::V1::Post

  def create
    @post = Post.new post_params
    if @post.save
      render json: post_json(@post), status: :ok
    else
      render json: @post.errors, status: :bad_request
    end
  end

  def index
    @posts = Post.all
    render json: posts_json(@posts), status: :ok
  end

  private
  def post_params
    params.require(:post).permit(:title, :body)
  end
end
