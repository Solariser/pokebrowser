import React, { Component } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import Image from 'material-ui-image';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    bgGreen: {
        backgroundColor: '#00ff00'
    },
    bgYellow: {
        backgroundColor: '#ffff00'
    },
    bgOrange: {
        backgroundColor: '#ff9933'
    },
    bgInfo: {
        backgroundColor: '#b3cccc'
    },
    basicPadding: {
        padding: theme.spacing(0.5)
    },
    headerColour: {
        backgroundColor: '#669999'
    }
});

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
                let current_type = this.state.pokemon.types[i].type.name;
                let current_type_string = current_type.charAt(0).toUpperCase() + current_type.slice(1).toLowerCase();

                type_components.push(
                    <Grid item xs={6} key={ 'type#' + i } className = { this.props.classes.bgInfo + " " + this.props.classes.basicPadding }>
                        <Typography>{ current_type_string }</Typography>
                    </Grid>
                );
            }

            return (
                <div>
                    <Typography variant="h5" className={ this.props.classes.headerColour + " " + this.props.classes.basicPadding }>Types</Typography>
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
                let current_stat = this.state.pokemon.stats[i].stat.name;
                let current_stat_string = current_stat.charAt(0).toUpperCase() + current_stat.slice(1).toLowerCase();

                let stat_value = this.state.pokemon.stats[i].base_stat;

                let classname = "bgOrange";
                if (stat_value >= 100) {
                    classname = "bgGreen";
                } else if (stat_value >= 70) {
                    classname="bgYellow";
                }

                stat_components.push(
                    <Grid container key={ 'stat#' + i }>
                        <Grid item xs={4} className = { this.props.classes.bgInfo + " " + this.props.classes.basicPadding }>
                            <Typography>{ current_stat_string }</Typography>
                        </Grid>
                        <Grid item xs={8} className={ this.props.classes[classname] + " " + this.props.classes.basicPadding }>
                            <Typography>{ stat_value }</Typography>
                        </Grid>
                    </Grid>
                );
            }

            return (
                <div>
                    <Typography variant="h5" className={ this.props.classes.headerColour + " " + this.props.classes.basicPadding }>Statistics</Typography>
                    { stat_components }
                </div>
            );
        }
    }

    render() {
        if (this.state.choice > 0 &&
            this.state.pokemon &&
            this.state.pokemon.sprites) {
            let pokemon_name = this.state.pokemon.name;
            let pokemon_name_string = pokemon_name.charAt(0).toUpperCase() + pokemon_name.slice(1).toLowerCase();

            return (
                <div>
                    <Typography variant="h4" className={ this.props.classes.headerColour + " " + this.props.classes.basicPadding }>#{ this.state.pokemon.id } : { pokemon_name_string }</Typography>
                    <Image
                        src={ this.state.pokemon.sprites.front_default }
                    />
                    <Grid align="center">
                        { this.props.addToFavourites ?
                        <Button
                            color="primary"
                            onClick={ () => this.props.addToFavourites(this.state.pokemon.id) }
                            fullWidth
                        >
                            Add to Favourites
                        </Button>
                        : "" }
                        { this.props.removeFromFavourites ?
                        <Button
                            color="primary"
                            onClick={ () => this.props.removeFromFavourites(this.state.pokemon.id) }
                            fullWidth
                        >
                            Remove from Favourites
                        </Button>
                        : "" }
                    </Grid>
                    { this.loadTypes() }
                    { this.loadStatistics() }
                </div>
            );
        }

        return (
            <Grid align="center">
                <Typography variant="h6"><b>You have not selected a pokemon.</b></Typography>
            </Grid>
        )
    }

}

export default withStyles(styles)(PokemonCard);
