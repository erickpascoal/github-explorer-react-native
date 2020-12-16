import React, { useCallback, useState, useEffect } from 'react';
import { Text, Image, SafeAreaView, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { Container, Input, ButtonSearch, ButtonSearchText, Form, ContainerRepository, RepositoryTitle, RepositoryDescription, ContainerInfo, Header, Logo, BackText } from './styles';

interface SearchData {
  repositoryName: string;
}

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const { control, handleSubmit, errors } = useForm();
  const navigation = useNavigation();

  useEffect(() => {
    getRepositoriesFromStorage();
  }, []);

  const onSubmit = useCallback(async (data: SearchData) => {
    const response = await api.get<Repository>(`/repos/${data.repositoryName}`);
    const repository = response.data;
    repositories.push(repository);
    setRepositories([...repositories]);
    console.log('repositories13', repositories);

    storeRepositories();
  }, [repositories]);

  const storeRepositories = useCallback(async () => {
    try {
      await AsyncStorage.setItem(
        '@GithubExplorer:repositories',
        JSON.stringify(repositories)
      );
    } catch (error) {
      console.log(error);
    }
  }, [repositories]);

  const getRepositoriesFromStorage = useCallback(async () => {
    try {
      const repositoriesJson = await AsyncStorage.getItem('@GithubExplorer:repositories');

      if (repositoriesJson) {
        const repositories = JSON.parse(repositoriesJson);
        setRepositories([...repositories]);
      }
    } catch (error) {
      // Error retrieving data
    }
  }, [repositories]);

  const gotoRepository = useCallback((repositoryName: string) => {
    console.log('repositoryName', repositoryName);

    navigation.navigate('Repository', { repositoryName });
  }, []);

  return (
    <Container>
      <Form>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              placeholder="Digite aqui"
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="repositoryName"
          rules={{ required: true }}
          defaultValue=""
        />

        <ButtonSearch onPress={handleSubmit(onSubmit)}>
          <ButtonSearchText>Pesquisar</ButtonSearchText>
        </ButtonSearch>

      </Form>

      {errors.search && <Text>Esse campo é obrigatório.</Text>}

      <SafeAreaView>
        <ScrollView>
          {repositories.map((repository: Repository) => (
            <ContainerRepository key={repository.full_name} onPress={() => gotoRepository(repository.full_name)}>
              <Image style={{ width: 45, height: 45 }} source={{ uri: repository.owner.avatar_url }} />

              <ContainerInfo>
                <RepositoryTitle>{repository.full_name}</RepositoryTitle>
                <RepositoryDescription>{repository.description}</RepositoryDescription>
              </ContainerInfo>

              <Icon color='#C9C9D4' name="chevron-right" size={20} />

            </ContainerRepository>
          ))}
        </ScrollView>
      </SafeAreaView>

    </Container>
  );
}

export default Dashboard;