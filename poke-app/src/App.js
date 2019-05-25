import React, { Component } from 'react';
import { NativeSelect, Grid, Typography } from '@material-ui/core';
import PokemonCard from './components/PokemonCard';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            favourites: [],
            loaded: false,
            select_one: '',
            select_two: '',
            select_fave: ''
        }
    }

    addToFavourites(pokemon_no) {
        if (!(this.state.favourites.indexOf(pokemon_no) >= 0)) {
            this.setState(prevState => ({
                favourites: [...prevState.favourites, pokemon_no]
            }));
        }
    }

    removeFromFavourites(pokemon_no) {
        if (this.state.favourites.indexOf(pokemon_no) >= 0) {
            let new_favourites = [...this.state.favourites];
            let index = this.state.favourites.indexOf(pokemon_no);
            new_favourites.splice(index, 1);

            this.setState({
                favourites: new_favourites,
                select_fave: ''
            });
        }
    }

    loadOriginalPokemon() {
        let pokemon_options = [];

        for (let i = 1; i <= 151; i++) {
            pokemon_options.push(
                <option key={'pokemon#' + i} value={i}>{i}</option>
            );
        }

        return pokemon_options;
    }

    loadFavouritePokemon() {
        if (this.state.favourites.length > 0) {
            let favourite_pokemon = [];

            for (let i = 0; i < this.state.favourites.length; i++) {
                favourite_pokemon.push(
                    <option key={'favourite#' + i} value={this.state.favourites[i]}>{this.state.favourites[i]}</option>
                );
            }

            return favourite_pokemon;
        }
    }

    handleChange(type, e) {
        this.setState({
            [type]: e.target.value
        })
    }

    render() {

        return (
            <div>
                <Grid container>
                    <Grid item xs={4}>
                        <Typography>First Choice</Typography>
                        <NativeSelect
                            value={this.state.select_one}
                            onChange={(e) => this.handleChange('select_one', e)}
                            name="select_one"
                        >
                            <option value=""></option>
                            { this.loadOriginalPokemon() }
                        </NativeSelect>
                        <PokemonCard
                            choice={ this.state.select_one }
                            addToFavourites = { (pokemon_no) => this.addToFavourites(pokemon_no) }
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>Second Choice</Typography>
                        <NativeSelect
                            value={this.state.select_two}
                            onChange={(e) => this.handleChange('select_two', e)}
                            name="select_two"
                        >
                            <option value=""></option>
                            { this.loadOriginalPokemon() }
                        </NativeSelect>
                        <PokemonCard
                            choice={ this.state.select_two }
                            addToFavourites = { (pokemon_no) => this.addToFavourites(pokemon_no) }
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>Fave Choice</Typography>
                        <NativeSelect
                            value={this.state.select_fave}
                            onChange={(e) => this.handleChange('select_fave', e)}
                            name="select_fave"
                        >
                            <option value=""></option>
                            { this.loadFavouritePokemon() }
                        </NativeSelect>
                        <PokemonCard
                            choice={ this.state.select_fave }
                            removeFromFavourites={ (pokemon_no) => this.removeFromFavourites(pokemon_no)}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }

}

export default App;
