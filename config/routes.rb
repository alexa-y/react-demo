Rails.application.routes.draw do
  root to: 'dashboard#index'

  scope :api, defaults: { format: :json }, constraints: { format: :json } do
    scope :v1 do
      resources :posts, except: [:new, :edit] do
        resources :comments, only: [:create, :destroy]
      end
    end
  end
end
