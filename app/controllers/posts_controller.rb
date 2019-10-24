require 'net/http'
require 'json'

class PostsController < ApplicationController
  include Common
  before_action :line_login, only: [:index]

  def index
    @post = Post.where(line_id: session[:line_id])
  end

  def show
    @post = Post.find(params[:id])
  end

  def new
    @post = Post.new
  end

  def edit
    @post = Post.find(params[:id])
  end

  def create
    if session[:access_token].nil?
      render action: :index
      flash.now[:danger] = 'ログインしてください。'
    else
      Post.create(post_params)
      redirect_to posts_path
    end
  end

  def update
    post = Post.find(params[:id])
    post.update(post_params)
    redirect_to posts_path
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    redirect_to posts_path
  end

  private

  def post_params
    params.require(:post).permit(:content, :line_id, :rank, :deadline)
  end
end
