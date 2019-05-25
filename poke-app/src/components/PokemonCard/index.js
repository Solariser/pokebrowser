import React, { Component } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import Image from 'material-ui-image';

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

    loadTypes() {
        if (this.state.pokemon &&
            this.state.pokemon.types &&
            this.state.pokemon.types.length > 0) {
            let type_components = [];

            for (let i = 0; i < this.state.pokemon.types.length; i++) {
                type_components.push(
                    <Grid item xs={6} key={ 'type#' + i }>
                        <Typography>{ this.state.pokemon.types[i].type.name }</Typography>
                    </Grid>
                );
            }

            return (
                <div>
                    <Typography variant="h5">Types</Typography>
                    <Grid container>
                        { type_components }
                    </Grid>
                </div>
            );
        }
    }

    loadStatistics() {
        if (this.state.pokemon &&
            this.state.pokemon.stats &&
            this.state.pokemon.stats.length > 0) {
            let stat_components = [];

            for (let i = 0; i < this.state.pokemon.stats.length; i++) {
                stat_components.push(
                    <Grid container key={ 'stat#' + i }>
                        <Grid item xs={4}>
                            <Typography>{ this.state.pokemon.stats[i].stat.name }</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>{ this.state.pokemon.stats[i].base_stat }</Typography>
                        </Grid>
                    </Grid>
                );
            }

            return (
                <div>
                    <Typography variant="h5">Statistics</Typography>
                    { stat_components }
                </div>
            );
        }
    }

    render() {
        if (this.state.choice > 0 &&
            this.state.pokemon &&
            this.state.pokemon.sprites) {
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
                    <Typography variant="h4">#{ this.state.pokemon.id } : { this.state.pokemon.name }</Typography>
                    <Image
                        src={ this.state.pokemon.sprites.front_default }
                    />
                    { this.loadTypes() }
                    { this.loadStatistics() }
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
