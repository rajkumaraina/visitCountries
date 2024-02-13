import {Component} from 'react'

import './index.css'

const initialCountriesList = [
  {
    id: '53c9c67a-c923-4927-8a75-fdfc4bc5ec61',
    name: 'Australia',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-australia-img.png',
    isVisited: false,
  },
  {
    id: '8baa8029-fb2c-4f06-bfcc-3dc9ad12b24d',
    name: 'Canada',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-canada-img.png',
    isVisited: false,
  },
  {
    id: '1b520f98-6548-41f3-816e-c8b887865172',
    name: 'Greenland',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-greenland-img.png',
    isVisited: false,
  },
  {
    id: '25841996-fbfd-4554-add4-4c94082c8ccd',
    name: 'India',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-india-img.png',
    isVisited: true,
  },
  {
    id: '603c3568-13b0-11ec-82a8-0242ac130003',
    name: 'Netherlands',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-netherland-img.png',
    isVisited: false,
  },
  {
    id: '3c988dec-55e1-477d-a9e2-b354fd559849',
    name: 'Portugal',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-portugal-img.png',
    isVisited: false,
  },
  {
    id: 'd766f754-34f7-413e-81ec-9992821b97fa',
    name: 'Switzerland',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-switzerland-img.png',
    isVisited: false,
  },
  {
    id: '7ebb4e04-b124-417f-a69e-564a456d70f1',
    name: 'Thailand',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-thailand-img.png',
    isVisited: false,
  },
  {
    id: '1e4b1dcd-6ace-4dde-ad8d-675927d5ae47',
    name: 'United Kingdom',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-united-kingdom-img.png',
    isVisited: true,
  },
  {
    id: 'e76da8ca-bc48-4981-902b-a4d2d46feb6d',
    name: 'Venezuela',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-venezuela-img.png',
    isVisited: false,
  },
]

const Countries = props => {
  const {item, buttonClicked} = props
  const {id, name, imageUrl, isVisited} = item

  const countryClicked = () => {
    buttonClicked(id)
  }

  return (
    <li className="listItem">
      <p className="countryName">{name}</p>
      {isVisited ? (
        <p className="visited">Visited</p>
      ) : (
        <button className="button" type="button" onClick={countryClicked}>
          Visit
        </button>
      )}
    </li>
  )
}

const Visited = props => {
  const {item, remove} = props
  const {id, name, imageUrl, isVisited} = item

  const RemoveButton = () => {
    remove(id)
  }

  return (
    <li className="VisitedListItem">
      <img src={imageUrl} alt="thumbnail" className="image" />
      <div className="container">
        <p className="visitedCountryName">{name}</p>
        <button className="removeButton" onClick={RemoveButton} type="button">
          Remove
        </button>
      </div>
    </li>
  )
}

const visitedCountries = initialCountriesList.filter(
  each => each.isVisited === true,
)
console.log(visitedCountries)
class VisitCountries extends Component {
  state = {countriesList: initialCountriesList, visitedList: visitedCountries}

  buttonClicked = id => {
    const {countriesList} = this.state
    const Item = countriesList.find(each => each.id === id)
    this.setState(prevState => ({
      countriesList: prevState.countriesList.map(each => {
        if (each.id === id) {
          return {...each, isVisited: true}
        }
        return each
      }),
      visitedList: [...prevState.visitedList, Item],
    }))
  }

  remove = id => {
    this.setState(prevState => ({
      countriesList: prevState.countriesList.map(each => {
        if (each.id === id) {
          return {...each, isVisited: false}
        }
        return each
      }),
      visitedList: prevState.visitedList.filter(each => each.id !== id),
    }))
  }

  render() {
    const {countriesList, visitedList} = this.state
    return (
      <div
        className={
          visitedList.length !== 0 ? 'mainContainer' : 'mainContainer main'
        }
      >
        <h1 className="countriesHeading">Countries</h1>
        <ul className="countriesUnordered">
          {countriesList.map(each => (
            <Countries
              item={each}
              key={each.id}
              buttonClicked={this.buttonClicked}
            />
          ))}
        </ul>
        <h1 className="countriesHeading"> Visited Countries</h1>
        <ul className="visitedUnorderedList">
          {visitedList.length !== 0 ? (
            visitedList.map(each => (
              <Visited item={each} key={each.id} remove={this.remove} />
            ))
          ) : (
            <p className="notVisited">No Countries Visited Yet!</p>
          )}
        </ul>
      </div>
    )
  }
}
export default VisitCountries
