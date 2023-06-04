Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root :to => "monomers#index"

  get "/monomers", to: "monomers#index"
  resources :users
end
