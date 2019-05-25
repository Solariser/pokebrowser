import React, { Component } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';

class PokemonCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemon: '',
            choice: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.choice !== this.props.choice) {
            this.setState({
                choice: nextProps.choice
            });

            fetch('https://pokeapi.co/api/v2/pokemon/' + nextProps.choice)
            .then((response) => {
                return response.json();
            })
            .then((pokemon) => {
                this.setState({
                    pokemon: pokemon
                });
            })
        }
    }

    render() {
        if (this.state.choice > 0) {
            return (
                <div>
                    { this.props.addToFavourites ?
                    <Button
                        color="primary"
                        onClick={ () => this.props.addToFavourites(this.state.pokemon.id) }
                    >
                        Add to Favourites
                    </Button>
                    : "" }
                    { this.props.removeFromFavourites ?
                    <Button
                        color="primary"
                        onClick={ () => this.props.removeFromFavourites(this.state.pokemon.id) }
                    >
                        Remove from Favourites
                    </Button>
                    : "" }
                    <Typography>#{ this.state.pokemon.id } : { this.state.pokemon.name }</Typography>
                </div>
            );
        }
        return (
            <div>
                <Typography>You have not selected a pokemon.</Typography>
            </div>
        )
    }

}

export default PokemonCard;
