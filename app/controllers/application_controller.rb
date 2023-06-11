class ApplicationController < ActionController::Base
    before_action :set_current_user
    def set_current_user
        # Find user by their session data
        Current.user = User.find_by(id: session[:user_id]) if session[:user_id]
    end
    def require_user_logged_in!
        # Only allow logged in user
        redirect_to root_path
    end
end
