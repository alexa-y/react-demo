Rails.application.routes.draw do
  root to: 'dashboard#index'

  scope :api, defaults: { format: :json }, constraints: { format: :json } do
    scope :v1 do
      
    end
  end
end
