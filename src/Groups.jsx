import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@mui/material';

// Моковый ответ от сервера
const servResponse = {
  "result": 1,
  "data": [
    {
      "id": 1,
      "name": "Фотографы новички",
      "closed": false,
      "avatar_color": "#f44336",
      "members_count": 150,
      "friends": [
        {
          "first_name": "Иван",
          "last_name": "Иванов"
        },
        {
          "first_name": "Мария",
          "last_name": "Петрова"
        }
      ]
    },
    {
      "id": 2,
      "name": "Любители книг",
      "closed": true,
      "avatar_color": "#3f51b5",
      "members_count": 300,
      "friends": [
        {
          "first_name": "Алексей",
          "last_name": "Сидоров"
        }
      ]
    },
    {
      "id": 3,
      "name": "Технологии будущего",
      "closed": false,
      "avatar_color": "#4caf50",
      "members_count": 500,
      "friends": []
    },
    {
      "id": 4,
      "name": "Путешественники",
      "closed": false,
      "avatar_color": "#ffeb3b",
      "members_count": 250,
      "friends": [
        {
          "first_name": "Дмитрий",
          "last_name": "Орлов"
        },
        {
          "first_name": "Елена",
          "last_name": "Кузнецова"
        },
        {
          "first_name": "Николай",
          "last_name": "Морозов"
        }
      ]
    }
  ]
}

const fetchGroups = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(servResponse), 1000); 
  });
};

function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroups()
      .then(response => {
        if (response.result === 1 && response.data) {
          setGroups(response.data);
        } else {
          console.error('Ошибка при получении данных о группах');
        }
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <List>
      {groups.map(group => (
        <ListItem key={group.id} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: group.avatar_color ? group.avatar_color : 'grey' }} />
          </ListItemAvatar>
          <ListItemText
  primary={group.name}
  secondary={
    <React.Fragment>
      <Typography component="span" variant="body2" color="text.primary">
        {group.closed ? 'Закрытая' : 'Открытая'} - {group.members_count} участников
      </Typography>
      {group.friends && group.friends.length > 0 && (
        <Typography component="span" variant="body2" color="text.secondary">
          {' - '}
          {group.friends.length} {group.friends.length === 1 ? 'друг' : 'друзей'}: {group.friends.map(friend => `${friend.first_name} ${friend.last_name}`).join(', ')}
        </Typography>
      )}
    </React.Fragment>
  }
/>
        </ListItem>
      ))}
    </List>
  );
}

export default Groups;
