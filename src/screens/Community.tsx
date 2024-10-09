import React from 'react';
import styled from 'styled-components';
import { FaUsers, FaComments, FaPaw } from 'react-icons/fa';

const CommunityContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const ForumSection = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const ForumTitle = styled.h2`
  display: flex;
  align-items: center;
  color: #4a90e2;
  margin-bottom: 15px;
`;

const Icon = styled.span`
  margin-right: 10px;
`;

const TopicList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TopicItem = styled.li`
  background-color: #f9f9f9;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const TopicIcon = styled.span`
  margin-right: 10px;
  color: #4a90e2;
`;

const Community: React.FC = () => {
  const mockTopics = [
    { title: "Tips for new pet owners", replies: 15 },
    { title: "Best food brands for dogs", replies: 23 },
    { title: "How to train your cat", replies: 8 },
    { title: "Dealing with separation anxiety", replies: 19 },
  ];

  return (
    <CommunityContainer>
      <h1>Community</h1>
      <ForumSection>
        <ForumTitle>
          <Icon><FaUsers /></Icon>
          Pet Owners Forum
        </ForumTitle>
        <TopicList>
          {mockTopics.map((topic, index) => (
            <TopicItem key={index}>
              <TopicIcon><FaComments /></TopicIcon>
              <div>
                <h3>{topic.title}</h3>
                <p>{topic.replies} replies</p>
              </div>
            </TopicItem>
          ))}
        </TopicList>
      </ForumSection>
      <ForumSection>
        <ForumTitle>
          <Icon><FaPaw /></Icon>
          Pet Meetups
        </ForumTitle>
        <p>Find local pet meetups and events in your area!</p>
        {/* Add functionality to show and join local pet meetups */}
      </ForumSection>
    </CommunityContainer>
  );
};

export default Community;