// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, SafeAreaView } from 'react-native'
import FilmItem from './FilmItem'
import FilmList from './FilmList'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.searchedText = ""
    this.page = 0
    this.totalPages = 0
    this.state = {
      films: [],
      isLoading: false
    }
    this._loadFilms = this._loadFilms.bind(this) // cf data binding
  }

  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true })
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
          this.page = data.page
          this.totalPages = data.total_pages
          this.setState({
            films: [ ...this.state.films, ...data.results ],
            isLoading: false
          })
      })
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text
  }

  _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: [],
    }, () => {
        this._loadFilms()
    })
  }

  _displayDetailForFilm = (idFilm) => {
    console.log("Display film with id " + idFilm)
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder='Titre du film'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        />
        <Button title='Rechercher' onPress={() => this._searchFilms()}/>
        <FilmList
          films={this.state.films}
          navigation={this.props.navigation}
          loadFilms={this._loadFilms}
          page={this.page}
          totalPages={this.totalPages}
          favoriteList={false} // Ici j'ai simplement ajouté un booléen à false pour indiquer qu'on n'est pas dans le cas de l'affichage de la liste des films favoris. Et ainsi pouvoir déclencher le chargement de plus de films lorsque l'utilisateur scrolle.
        />
        {this._displayLoading()}
      </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Search

// ----------------------------------------------------------------------------
// https://reactnative.dev/docs/components-and-apis.html#basic-components
// Components --> un component rend un élément graphique avec la méthode render (retourne un élément graphique).
// Sous React, les components se présentent sous la forme d'une class / Components customs = combinaison de componentns react - native (cf docu react)
// syntax onPress = ES6 (une fonction qui retourne un résultat)
// export --> utiliser l'appli où on l'import
// Cette notion de component est très pratique. 
// Elle permet de découper nos interfaces utilisateur en pièces indépendantes et réutilisables, et de penser à chaque pièce séparément (définition React).
// ----------------------------------------------------------------------------
// const styles = StyleSheet.creat ({}) --> ici on externalise le front // on utilisera plus tard SafeArea etc.
// PROPS = propriété appliqué à un Component (ex : Styles, placeholder, ...)
// console.log(this.props) permet de comprendre d'où peut venir un bug
// ----------------------------------------------------------------------------
// FLatList --> data = données affichées dans la liste & renderItem = rendu des données de la liste
// KeyExtractor --> spécifier la propriété de notre item qui va servir de key. il doit toujours être unique, d'où l'utilisation d'un id
// définir la key permet à React de savoir si un item a été ajouté ou supprimé, on peut ainsi manipuler notre liste de données
// ----------------------------------------------------------------------------
// https://reactnative.dev/docs/state --> qu'est ce qu'un state ?
// modifier notre component et ses données affichées --> intervention du state
// Dans notre component Search, on gère un tableau de films que l'on affiche ensuite dans une flatlist, c tableau est modifié à chaque call API
// En React, pour modifier une donnée du state, on passe toujours par setState
// setState  récupère les modifications de vos données et indique à React que le component a besoin d'être re-rendu avec ces  nouvelles données.
// setState est une fonction asynchrone = fonction qui s'exécute en arrière-plan, qui ne bloque pas l'exécution du code.
// https://reactjs.org/docs/react-component.html#setstate doc setState
// setState possède un paramètre callback qui permet d'exécuter une action dès que notre state a fini de se mettre à jour. setState(updater[, callback])  