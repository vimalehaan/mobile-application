import { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
    RefreshControl,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen() {
    const { username, clickCount, setClickCount } = useContext(AuthContext);
    const [movies, setMovies] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchMovies = async () => {
        const url ='https://imdb-top-100-movies.p.rapidapi.com/';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '56bf9cbf64msh0fa433fcdadc8dfp1aa9b4jsndce49741c23a',
                'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setMovies(result)
            // console.log(result);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };
    console.log(`movies ${movies}`)
    const onRefresh = async () => {
        setRefreshing(true);
        await fetchMovies();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const renderMovieCard = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => setClickCount(prev => prev + 1)}
        >
            <Image
                style={styles.movieImage}
                source={{ uri: item.image }}
            />
            <View style={styles.cardContent}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.movieYear}>{item.year}</Text>

                <View style={styles.tagContainer}>
                    <Text style={styles.tag}>Now Showing</Text>
                </View>
                <Text style={styles.description} numberOfLines={3}>
                    {item.overview}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Welcome, {username}!</Text>
            <FlatList
                data={movies}
                renderItem={renderMovieCard}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
            <TouchableOpacity style={styles.floatingButton}>
                <Text style={styles.floatingButtonText}>Clicks: {clickCount}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkText: {
        color: '#007AFF',
        textAlign: 'center',
        marginTop: 15,
    },
    welcome: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    listContainer: {
        paddingBottom: 80,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    movieImage: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardContent: {
        padding: 15,
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    movieYear: {
        fontSize: 15,
        // fontWeight: 'bold',
        marginBottom: 5,
    },
    tagContainer: {
        backgroundColor: '#007AFF',
        padding: 7,
        borderRadius: 10,
        alignSelf: 'flex-start',
        // marginBottom: 10,
    },
    tag: {
        color: 'white',
        fontSize: 12,
    },
    description: {
        color: '#666',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 25,
        elevation: 5,
    },
    floatingButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});