import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import {
  Container, ContainerInfo, ContainerRepositoryStatus, ContainerStatus,
  IssueDescription, IssueStyled, IssueTitle, RepositoryDescription, RepositoryInfo,
  RepositoryName, ContainerRepositoryText, StatusName, StatusNumber
} from './styles';

interface PropsParams {
  repositoryName: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  }
}

const Repository: React.FC = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as PropsParams;
  const [repositoryName, setRepositoryName] = useState<string>(params.repositoryName);
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    init();
  }, []);

  const init = useCallback(async () => {
    const [responseRepository, reponseIssues] = await Promise.all(
      [
        api.get(`/repos/${repositoryName}`),
        api.get(`/repos/${repositoryName}/issues`)
      ]
    );

    setRepository(responseRepository.data);
    setIssues(reponseIssues.data);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>

          {/* <Header>
            <Icon color='#6C6C80' name="chevron-left" size={20} />
            <BackText>Voltar </BackText>
          </Header> */}

          {repository && (
            <>
              <ContainerRepositoryText>
                <Image style={{ width: 70, height: 70 }} source={{ uri: repository?.owner?.avatar_url }} />
                <RepositoryInfo>
                  <RepositoryName>{repository.full_name}</RepositoryName>
                  <RepositoryDescription>{repository.description}</RepositoryDescription>
                </RepositoryInfo>
              </ContainerRepositoryText>

              <ContainerRepositoryStatus>
                <ContainerStatus>
                  <StatusNumber>{repository.stargazers_count.toString()}</StatusNumber>
                  <StatusName>Stars</StatusName>
                </ContainerStatus>

                <ContainerStatus>
                  <StatusNumber>{repository.forks_count.toString()}</StatusNumber>
                  <StatusName>Forks</StatusName>
                </ContainerStatus>

                <ContainerStatus>
                  <StatusNumber>{repository.open_issues_count.toString()}</StatusNumber>
                  <StatusName>Issues abertas</StatusName>
                </ContainerStatus>
              </ContainerRepositoryStatus>
            </>
          )}

          {issues && issues.map((issue: Issue) => (
            <IssueStyled key={issue.id} onPress={() => navigation.navigate('Issue', { issueUrl: issue.html_url })}>
              <ContainerInfo>
                <IssueTitle>{issue.title}</IssueTitle>
                <IssueDescription>{issue.user.login}</IssueDescription>
              </ContainerInfo>
              <Icon color='#C9C9D4' name="chevron-right" size={20} />
            </IssueStyled>
          ))}
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Repository;