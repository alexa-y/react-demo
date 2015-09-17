class PostsController < ApplicationController
  include Api::V1::Post

  before_action :find_post, only: [:show, :update, :destroy]

  def find_post
    @post = Post.find params[:id]
  end

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

  def show
    render json: post_json(@post, params[:include] || []), status: :ok
  end

  def update
    if @post.update post_params
      render json: post_json(@post), status: :ok
    else
      render json: @post.errors, status: :bad_request
    end
  end

  def destroy
    @post.destroy
    render nothing: true, status: :no_content
  end

  private
  def post_params
    params.require(:post).permit(:title, :body)
  end
end
