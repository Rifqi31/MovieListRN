import React from "react";
import { FlatList } from "react-native";	// import Flatlist from react-native
import {
    // base component
    Container,
    Header,
    Content,
    Footer,

    // component require
    Title,
    Subtitle,
    Text,
    Body,
    Right,
    Left,
    Icon,
    Thumbnail,
    Button
} from "native-base";
import stylesWindow from "./Style";	// stylesheet

class MovieDetail extends React.PureComponent {
    
    // // create constructor
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
            movie_id : 0,
			//
			error : null,
			refreshing : false
		};
    }

    // // call the API function    
	componentDidMount = () => {
        const item = this.props.navigation.state.params;
        this.setState({
            movie_id : item.id
        }, () => {
            this.makeRemoteRequest();
        })
    }
	
    // call the api url and manipulate it
	makeRemoteRequest = () => {
		const {
			api_version,
            api_key,
            movie_id,
			language
		} = this.state
		const url = `https://api.themoviedb.org/${api_version}/movie/${movie_id}?api_key=${api_key}&language=${language}`;
        this.setState({ loading : true })
		fetch(url)
        .then(response => response.json())
		.then(response => {
            this.setState({
                // depends on json structure if there is no results field use response only
                data: [response],
                error: response.error || null,
                loading: false,
                // refreshing: false
            });
            console.warn(this.state.data)
        })
       
        .catch(error => {
            this.setState({ error, loading: false});
        });
    }

    // render movie item
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
                            <Icon name="menu" style={ stylesWindow.iconColor }/>
                        </Button>
					</Left>
						<Body>
						</Body>
					<Right />
                </Header>
                    <Content style = {stylesWindow.ContentStyleColor}>
                    </Content>
            </Container>
        );
    }
}

export default MovieDetail;
