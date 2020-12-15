import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import api from '../../services/api';

import { Container, IssueStyled } from './styles';

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

  const route = useRoute();
  const params = route.params as PropsParams;
  const [repositoryName, setRepositoryName] = useState<string>(params.repositoryName);
  const [repository, setRepository] = useState<Repository>({} as Repository);
  const [issues, setIssues] = useState<any[]>([]);

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
          {repository && (
            <View key={repository.full_name}>
              <Text>{repository.full_name}</Text>
              <Text>{repository.description}</Text>
            </View>
          )}

          {issues && issues.map((issue: any) => (
            <IssueStyled key={issue.id}>
              <Text>{issue.title}</Text>
              <Text>{issue.user.login}</Text>
            </IssueStyled>
          ))}
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Repository;