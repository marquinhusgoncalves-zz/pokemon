import React from "react";
import ReactDOM from "react-dom";
import fetchPokemon from "./fetchPokemon";

const withPokemon = Component =>
  class FetchPokemon extends React.Component {
    state = {
      character: null
    };

    componentDidMount() {
      fetchPokemon(this.props.id).then(character =>
        this.setState({ character })
      );
    }

    componentWillReceiveProps(nextProps) {
      fetchPokemon(nextProps.id).then(character =>
        this.setState({ character })
      );
    }

    render() {
      return this.state.character ? (
        <Component character={this.state.character} />
      ) : (
          <div>loading...</div>
        );
    }
  };

const Pokemon = props => (
  <div>
    <h2>{props.character.name}</h2>

    <h4>Abilities</h4>
    <ul>
      {props.character.abilities.map(ability => (
        <li key={ability.ability.name}>
          {ability.ability.name}
        </li>
      ))}
    </ul>
  </div>
);

class IdPager extends React.Component {
  state = {
    id: 1
  };

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={() =>
            this.setState(({ id }) => ({ id: id - 1 }))}
        >
          Previous
        </button>

        <button
          type="button"
          onClick={() =>
            this.setState(({ id }) => ({ id: id + 1 }))}
        >
          Next
        </button>

        {this.props.render(this.state.id)}
      </div>
    );
  }
}

ReactDOM.render(
  <IdPager
    render={id =>
      React.createElement(withPokemon(Pokemon), { id: id })}
  />,
  document.getElementById("root")
);
