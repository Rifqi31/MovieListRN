import React from "react";
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
	List,
	ListItem
} from "native-base";

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
			sort_by : 'popularity.asc',
			include_adult_movie : false,
			include_video : false,
			page : 1,
			//
			error : null,
			refreshing : false
		};

	}

	componentDidMount =() => {
		this.makeRemoteRequest();
	}

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



	render(){
		return(
			<Container>
				<Header>
					<Left />
						<Body>
							<Title>Movie List</Title>
						</Body>
					<Right />
				</Header>
					<Content>
						<List
							dataArray = { this.state.data }
							renderRow = { movieItem => 
								<ListItem>
									<Left>
										<Text>{ movieItem.title }</Text>
									</Left>
								</ListItem> }

						 />
					</Content>
			</Container>
		);
	}




}

export default MovieDataList;
