class V1::GreetingsController < ApplicationController
  def index
    @greeting = Greeting.order('RANDOM()').first
    render json: { greetings: [
      { name: @greeting.name }
    ] }.to_json
  end
end
