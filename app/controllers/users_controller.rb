class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def login
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(username: "...", email: "...", password: "...")

    if @user.save
      redirect_to @user
    else
      render :new, status: :unprocessable_entity
    end
  end

  private
    def user_params
      params.require(:user).permit(:username, :email, :password)
    end
end
