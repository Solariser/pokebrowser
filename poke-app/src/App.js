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
        this.setState(prevState => ({
            favourites: [...prevState.favourites, pokemon_no]
        }));
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
                        </NativeSelect>
                        <PokemonCard
                            choice={ this.state.select_fave }
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }

}

export default App;
