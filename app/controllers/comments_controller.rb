class CommentsController < ApplicationController
  include Api::V1::Comment
  before_action :find_post

  def find_post
    @post = Post.find params[:post_id]
  end

  def create
    @comment = @post.comments.new comment_params
    if @comment.save
      render json: comment_json(@comment), status: :ok
    else
      render json: @comment.errors, status: :bad_request
    end
  end

  def destroy
    @comment = @post.comments.find params[:id]
    @comment.destroy
    render nothing: true, status: :no_content
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end
