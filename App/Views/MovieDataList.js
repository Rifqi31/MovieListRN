import React from "react";
import { FlatList } from "react-native";	// import Flatlist from react-native
import {
	// base component
	Container,
	Header,
	Content,
	Footer,

	// component requier
	Title,
	Text,
	Body,
	Right,
	Left,
	Icon,
	Thumbnail,
	Button,
	ListItem
} from "native-base";
import stylesWindow from "./Style";	// stylesheet

class MovieDataList extends React.PureComponent {
	// create constructor
	constructor(props){
		super(props);

		// default statement
		this.state = {
			loading : false,
			data : [],
			// depends on API
			// using API TmDB API
			api_version : 3,
			api_key : '9a4a662a126525b07d4b84b079d809d8',
			language : 'en-US',
			// optional param
			sort_by : 'popularity.desc',
			include_adult_movie : false,
			include_video : false,
			page : 1,
			//
			error : null,
			refreshing : false
		};

	}

	// call the API function
	componentDidMount = () => {
		this.makeRemoteRequest();
	}
	// call the api url and manipulate it
	makeRemoteRequest = () => {
		const {
			api_version,
			api_key,
			language,
			sort_by,
			include_adult_movie,
			include_video,
			page
		} = this.state
		const url = `https://api.themoviedb.org/${api_version}/discover/movie?api_key=${api_key}&language=${language}&sort_by=${sort_by}&include_adult=${include_adult_movie}&include_video=${include_video}&page=${page}`;
		this.setState({ loading : true })
		fetch(url)
		.then(response => response.json())
		.then(response => {
            this.setState({
                data: [...this.state.data, ...response.results],
                error: response.error || null,
                loading: false,
                // refreshing: false
            });
        })
        .catch(error => {
            this.setState({ error, loading: false});
        });
	}

	// infinite scroll
	handleLoadMore = () => {
		this.setState({
			page: this.state.page + 1,
            loading: true
		}, () => {
            this.makeRemoteRequest();
        });
	}

	// render movie item
	renderItem = ({ item }) => {
		return (
			<ListItem Thumbnail>
				<Left>
					<Thumbnail style = {{ height: 110, borderRadius: 30/2}} square large source= {{ uri:"https://image.tmdb.org/t/p/w185" + item.poster_path }}/>
						<Body>
							<Text style = { stylesWindow.fontMainColor } >{ item.title }</Text>
							<Text style = { stylesWindow.fontMainColor } note >Release Date : { item.release_date }</Text>
							<Text style = { stylesWindow.fontMainColor } note >Vote Avarage : { item.vote_average }</Text>
							<Text style = { stylesWindow.fontMainColor } note >Language : { item.original_language}</Text>
						</Body>
				</Left>
				<Button transparent>
					<Icon name="arrow-forward" style={ stylesWindow.arrowColor }/>
				</Button>
			</ListItem>
		);
	}

	// main render
	render(){
		return(
			<Container>
				<Header 
					style = { stylesWindow.headerBackgroundColor }
					androidStatusBarColor="#504F6D"
                    iosBarStyle="light-content"
				>
					<Left>
						<Button transparent>
                            <Icon name="menu" />
                        </Button>
					</Left>
						<Body>
							<Title>Movie List</Title>
						</Body>
					<Right />
				</Header>
					<Content style = {stylesWindow.ContentStyleColor}>
						<FlatList 
							data = { this.state.data }
							// render per item
							renderItem = { this.renderItem }
							// key list
							keyExtractor={ item => item.id.toString() }
							 // infinite scroll
							onEndReached={this.handleLoadMore}
							onEndReachedThreshold={0.5}
							// performence source https://github.com/filipemerker/flatlist-performance-tips
							removeClippedSubviews={true}	// for memory friendly
							maxToRenderPerBatch={5}			// for rendered per bacth
							updateCellsBatchingPeriod={30}	// tells the amount of items rendered per batch in ms
							initialNumToRender={3}			// This means the initial amount of items to render
							windowSize={10}					// The number passed here is a measurement unit where 1 is equivalent to your viewport height

						/>
					</Content>
			</Container>
		);
	}

}

export default MovieDataList;
