import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 10px;
`;

export const Form = styled.View`
  flex-direction: row;
`;

export const Input = styled.TextInput`
  background-color: #ffffff;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  padding: 10px;
  color: #3A3A3A;
  flex: 1;
`;

export const ButtonSearch = styled.TouchableOpacity`
  background-color: #04D361;
  width: 100px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  justify-content: center;
  align-items: center;
`;

export const ButtonSearchText = styled.Text`
  color: #ffffff;
`;

export const ContainerRepository = styled.TouchableOpacity`
  background-color: #ffffff;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 6px;
  padding: 15px;
  border-radius: 6px;
`;

export const ContainerInfo = styled.View`
  flex: 1;
  padding: 0 15px;
`;

export const RepositoryTitle = styled.Text`
  color: #3D3D4D;
  font-weight: 700;
  font-size: 20px;
`;

export const RepositoryDescription = styled.Text`
  color: #A8A8B3
`;