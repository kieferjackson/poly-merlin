Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root :to => "copolymer_series#index"

  # Miscellaneous/Testing Routes
  get "/monomers", to: "monomers#index"

  # Copolymer Series Routes
  resources :copolymer_series

  # User Routes
  resources :users, only: [:new, :create, :edit, :update, :show, :destroy]
  get "/signup", to: "users#new"
  get "/login", to: "users#login"

  # Session Routes
  post "/login", to: "sessions#create"
  delete "logout", to: "sessions#destroy"
end
