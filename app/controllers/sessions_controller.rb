class SessionsController < ApplicationController
    def new; end

    def create
        @user = User.find_by(username: params[:username])

        # Authenticate user credentials
        if @user.present? && @user.authenticate(params[:password])
            # Set session and redirect on success
            session[:user_id] = @user.id
            redirect_to root_path
        else
            # User could not be authenticated, return error message
            message = "Unable to be authenticated. Please make sure that your username and password are valid"
            redirect_to login_path, notice: message
        end
    end

    def destroy
        # Delete user session
        session[:user_id] = nil
        redirect_to root_path
    end
end