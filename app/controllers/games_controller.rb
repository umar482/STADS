class GamesController < ApplicationController
  def index
    @games = Game.all
    @total_price =@games.sum("price_per_minute * minutes_booked")
    @total_minutes =@games.sum("minutes_booked")
  end

  def update
    @game= Game.find(params[:id])
    @game.update(games_params)
  end

  private 

  def games_params
    params.require(:game).permit(:minutes_booked)
  end
end
