import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, TextField, IconButton,
  List, ListItem, ListItemText, ListItemAvatar, Avatar,
  Divider, Badge, Card, CardContent, Menu, MenuItem,
  InputAdornment, Tabs, Tab, Chip, Button
} from '@mui/material';
import {
  Search, Send, AttachFile, MoreVert, 
  Videocam, MicNone, InsertDriveFile, 
  Image, SentimentSatisfiedAlt
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

// Initialize empty conversations data - will be populated from API
const conversationsData = {
  doctor: [],
  patient: []
};

// Initialize empty messages - will be populated from API
const sampleMessages = [];

// Function to get initials from name for avatar
const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

export default function Messaging({ userType }) {
  const { currentUser } = useAuth();
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const messagesEndRef = useRef(null);

  // Data based on user type
  const conversations = userType === 'doctor' 
    ? conversationsData.doctor 
    : conversationsData.patient;

  // Filter conversations based on search term
  const filteredConversations = conversations.filter(
    conversation => conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Load messages when a conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      // In a real app, this would fetch messages from an API
      setMessages(sampleMessages);
    }
  }, [selectedConversation]);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      sender: userType,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMessageList = () => (
    <Paper sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
      {/* Conversation header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
        {selectedConversation ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{ width: 40, height: 40, mr: 2, bgcolor: 'primary.main' }}
            >
              {getInitials(selectedConversation.name)}
            </Avatar>
            <Box>
              <Typography variant="subtitle1">
                {selectedConversation.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedConversation.isPatient ? 'Patient' : selectedConversation.specialization}
                {' • '}
                <Box component="span" sx={{ 
                  display: 'inline-block', 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  bgcolor: selectedConversation.status === 'online' ? 'success.main' : 'text.disabled',
                  mr: 0.5
                }} />
                {selectedConversation.status === 'online' ? 'Online' : 'Offline'}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Typography variant="subtitle1">Select a conversation</Typography>
        )}
        
        {selectedConversation && (
          <Box>
            <IconButton onClick={handleMenuOpen}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>View Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Start Video Call</MenuItem>
              <MenuItem onClick={handleMenuClose}>Clear Chat</MenuItem>
            </Menu>
          </Box>
        )}
      </Box>

      {/* Messages area */}
      {selectedConversation ? (
        <>
          <Box sx={{ 
            flexGrow: 1, 
            p: 2, 
            overflow: 'auto', 
            display: 'flex', 
            flexDirection: 'column'
          }}>
            {messages.map((message) => (
              <Box 
                key={message.id} 
                sx={{ 
                  alignSelf: message.sender === userType ? 'flex-end' : 'flex-start',
                  maxWidth: '70%',
                  mb: 2
                }}
              >
                <Card 
                  variant="outlined"
                  sx={{ 
                    bgcolor: message.sender === userType ? 'primary.light' : 'background.default',
                    borderRadius: 2
                  }}
                >
                  <CardContent sx={{ py: 1, '&:last-child': { pb: 1 } }}>
                    <Typography variant="body1">{message.content}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        {message.timestamp}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>
          
          {/* Message input */}
          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <form onSubmit={handleSendMessage}>
              <Grid container spacing={1}>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small">
                            <SentimentSatisfiedAlt />
                          </IconButton>
                          <IconButton size="small">
                            <AttachFile />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ height: '100%' }}
                    startIcon={<Send />}
                  >
                    Send
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </>
      ) : (
        <Box sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexDirection: 'column',
          p: 3
        }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No conversation selected
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Select a conversation from the list to start messaging
          </Typography>
        </Box>
      )}
    </Paper>
  );

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Messages
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Secure communication with your {userType === 'doctor' ? 'patients' : 'doctors'}.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {/* Conversations list */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2 }}>
              <TextField
                fullWidth
                placeholder={`Search ${userType === 'doctor' ? 'patients' : 'doctors'}...`}
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                size="small"
              />
            </Box>
            
            <Tabs 
              value={selectedTab} 
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ px: 2 }}
            >
              <Tab label="All" />
              <Tab label="Unread" />
            </Tabs>
            
            <Divider />
            
            <List sx={{ flexGrow: 1, overflow: 'auto' }}>
              {filteredConversations.length > 0 ? (
                filteredConversations
                  .filter(convo => selectedTab === 0 || convo.unread > 0)
                  .map((conversation) => (
                    <React.Fragment key={conversation.id}>
                      <ListItem 
                        button
                        selected={selectedConversation?.id === conversation.id}
                        onClick={() => handleConversationSelect(conversation)}
                      >
                        <ListItemAvatar>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                            color={conversation.status === 'online' ? 'success' : 'default'}
                          >
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              {getInitials(conversation.name)}
                            </Avatar>
                          </Badge>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography 
                              variant="subtitle2"
                              sx={{ fontWeight: conversation.unread > 0 ? 'bold' : 'normal' }}
                            >
                              {conversation.name}
                            </Typography>
                          }
                          secondary={
                            <Typography 
                              variant="body2" 
                              noWrap
                              sx={{ color: conversation.unread > 0 ? 'text.primary' : 'text.secondary' }}
                            >
                              {conversation.lastMessage}
                            </Typography>
                          }
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                          <Typography variant="caption" color="text.secondary">
                            {conversation.timestamp}
                          </Typography>
                          {conversation.unread > 0 && (
                            <Chip
                              label={conversation.unread}
                              size="small"
                              color="primary"
                              sx={{ height: 20, minWidth: 20, mt: 0.5 }}
                            />
                          )}
                        </Box>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))
              ) : (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography color="text.secondary">
                    No conversations found
                  </Typography>
                </Box>
              )}
            </List>

            <Divider />
            
            <Box sx={{ p: 2 }}>
              <Button 
                fullWidth 
                variant="contained" 
                color="primary"
                startIcon={<Videocam />}
              >
                Start Video Call
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        {/* Message content */}
        <Grid item xs={12} md={8}>
          {renderMessageList()}
        </Grid>
      </Grid>
    </Box>
  );
} 