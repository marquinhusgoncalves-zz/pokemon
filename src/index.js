import React from "react";
import ReactDOM from "react-dom";
import fetchPokemon from "./fetchPokemon";

const withPokemon = Component =>
  class FetchPokemon extends React.Component {
    static defaultProps = {
      renderLoading: <div>loading...</div>
    };

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
          this.props.renderLoading
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
    return this.props.render(this.state.id, {
      increment: () =>
        this.setState(({ id }) => ({ id: id + 1 })),
      decrement: () =>
        this.setState(({ id }) => ({ id: id - 1 }))
    });
  }
}

ReactDOM.render(
  <IdPager
    render={(id, actions) => (
      <div>
        <button
          className="btn"
          type="button"
          onClick={actions.decrement}
        >
          Previous
        </button>

        <button
          className="btn"
          style={{ marginLeft: ".5em" }}
          type="button"
          onClick={actions.increment}
        >
          Next
        </button>

        {React.createElement(withPokemon(Pokemon), {
          id: id,
          renderLoading: <h4>LOADING</h4>
        })}
      </div>
    )}
  />,
  document.getElementById("root")
);
