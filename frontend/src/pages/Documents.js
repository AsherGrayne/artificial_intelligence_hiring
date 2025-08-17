import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Upload as UploadIcon,
  Description as DocIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
  Folder as FolderIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';

const Documents = () => {
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [uploadData, setUploadData] = useState({
    file: null,
    fileName: '',
    documentType: 'resume',
    candidateId: '',
    candidateName: '',
    tags: [],
    description: '',
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const [documents] = useState([
    {
      id: 1,
      fileName: 'Alice_Johnson_Resume.pdf',
      originalName: 'Alice_Johnson_Resume.pdf',
      documentType: 'resume',
      candidateName: 'Alice Johnson',
      fileSize: '2.4 MB',
      uploadDate: '2024-06-15',
      tags: ['Python', 'React', 'AWS'],
      description: 'Senior Developer Resume',
      status: 'processed',
      aiAnalysis: 'Skills extracted: Python, React, AWS, Docker',
    },
    {
      id: 2,
      fileName: 'Bob_Davis_Cover_Letter.pdf',
      originalName: 'Bob_Davis_Cover_Letter.pdf',
      documentType: 'cover_letter',
      candidateName: 'Bob Davis',
      fileSize: '1.8 MB',
      uploadDate: '2024-06-14',
      tags: ['Frontend', 'JavaScript'],
      description: 'Frontend Developer Cover Letter',
      status: 'processed',
      aiAnalysis: 'Motivation level: High, Communication: Excellent',
    },
    {
      id: 3,
      fileName: 'Carol_White_Portfolio.pdf',
      originalName: 'Carol_White_Portfolio.pdf',
      documentType: 'portfolio',
      candidateName: 'Carol White',
      fileSize: '5.2 MB',
      uploadDate: '2024-06-13',
      tags: ['DevOps', 'Infrastructure'],
      description: 'DevOps Engineer Portfolio',
      status: 'processing',
      aiAnalysis: 'Portfolio analysis in progress...',
    },
    {
      id: 4,
      fileName: 'John_Smith_References.pdf',
      originalName: 'John_Smith_References.pdf',
      documentType: 'references',
      candidateName: 'John Smith',
      fileSize: '1.1 MB',
      uploadDate: '2024-06-12',
      tags: ['References', 'Background'],
      description: 'Professional References',
      status: 'processed',
      aiAnalysis: 'Reference verification completed',
    },
  ]);

  const [candidates] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@email.com' },
    { id: 2, name: 'Bob Davis', email: 'bob@email.com' },
    { id: 3, name: 'Carol White', email: 'carol@email.com' },
    { id: 4, name: 'John Smith', email: 'john@email.com' },
  ]);

  const documentTypes = [
    { value: 'resume', label: 'Resume', icon: <DocIcon /> },
    { value: 'cover_letter', label: 'Cover Letter', icon: <DocIcon /> },
    { value: 'portfolio', label: 'Portfolio', icon: <ImageIcon /> },
    { value: 'references', label: 'References', icon: <DocIcon /> },
    { value: 'certificates', label: 'Certificates', icon: <DocIcon /> },
    { value: 'other', label: 'Other', icon: <DocIcon /> },
  ];

  const handleFileUpload = () => {
    if (!uploadData.file || !uploadData.fileName) return;

    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setOpenUploadDialog(false);
          setUploadData({
            file: null,
            fileName: '',
            documentType: 'resume',
            candidateId: '',
            candidateName: '',
            tags: [],
            description: '',
          });
          setUploadProgress(0);
          return 0;
        }
        return prev + 10;
      });
    }, 100);

    // In real app, this would upload to backend
    console.log('Uploading document:', uploadData);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadData({
        ...uploadData,
        file: file,
        fileName: file.name,
      });
    }
  };

  const handleViewDocument = (document) => {
    setSelectedDocument(document);
    setOpenViewDialog(true);
  };

  const handleDeleteDocument = (documentId) => {
    // In real app, this would delete from backend
    console.log('Deleting document:', documentId);
  };

  const handleDownloadDocument = (document) => {
    // In real app, this would trigger download
    console.log('Downloading document:', document);
  };

  const getDocumentIcon = (type) => {
    switch (type) {
      case 'resume': return <DocIcon color="primary" />;
      case 'cover_letter': return <DocIcon color="secondary" />;
      case 'portfolio': return <ImageIcon color="success" />;
      case 'references': return <DocIcon color="info" />;
      default: return <DocIcon />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processed': return 'success';
      case 'processing': return 'warning';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || doc.documentType === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Document Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          onClick={() => setOpenUploadDialog(true)}
        >
          Upload Document
        </Button>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Total Documents
                  </Typography>
                  <Typography variant="h4" component="div">
                    {documents.length}
                  </Typography>
                </Box>
                <FolderIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Resumes
                  </Typography>
                  <Typography variant="h4" component="div" color="primary.main">
                    {documents.filter(d => d.documentType === 'resume').length}
                  </Typography>
                </Box>
                <DocIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Processed
                  </Typography>
                  <Typography variant="h4" component="div" color="success.main">
                    {documents.filter(d => d.status === 'processed').length}
                  </Typography>
                </Box>
                <DocIcon color="success" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Total Size
                  </Typography>
                  <Typography variant="h4" component="div" color="info.main">
                    {documents.reduce((acc, doc) => {
                      const size = parseFloat(doc.fileSize);
                      return acc + size;
                    }, 0).toFixed(1)} MB
                  </Typography>
                </Box>
                <FolderIcon color="info" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search documents, candidates, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Document Type</InputLabel>
                <Select
                  value={filterType}
                  label="Document Type"
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  {documentTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                fullWidth
              >
                Advanced Filters
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Documents ({filteredDocuments.length})
          </Typography>
          
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Document</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Candidate</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Upload Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDocuments.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getDocumentIcon(document.documentType)}
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {document.fileName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {document.description}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={documentTypes.find(t => t.value === document.documentType)?.label}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {document.candidateName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {document.fileSize}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {document.uploadDate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={document.status}
                        color={getStatusColor(document.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {document.tags.map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title="View Document">
                          <IconButton
                            size="small"
                            onClick={() => handleViewDocument(document)}
                          >
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Download">
                          <IconButton
                            size="small"
                            onClick={() => handleDownloadDocument(document)}
                          >
                            <DownloadIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteDocument(document.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Upload Document Dialog */}
      <Dialog open={openUploadDialog} onClose={() => setOpenUploadDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Upload New Document</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<UploadIcon />}
                sx={{ py: 3, border: '2px dashed', borderColor: 'primary.main' }}
              >
                {uploadData.file ? uploadData.file.name : 'Click to select file or drag and drop'}
                <input
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                />
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="File Name"
                value={uploadData.fileName}
                onChange={(e) => setUploadData({...uploadData, fileName: e.target.value})}
                placeholder="Enter custom file name (optional)"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Document Type</InputLabel>
                <Select
                  value={uploadData.documentType}
                  label="Document Type"
                  onChange={(e) => setUploadData({...uploadData, documentType: e.target.value})}
                >
                  {documentTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Candidate</InputLabel>
                <Select
                  value={uploadData.candidateId}
                  label="Candidate"
                  onChange={(e) => {
                    const candidate = candidates.find(c => c.id === e.target.value);
                    setUploadData({
                      ...uploadData,
                      candidateId: e.target.value,
                      candidateName: candidate ? candidate.name : ''
                    });
                  }}
                >
                  {candidates.map((candidate) => (
                    <MenuItem key={candidate.id} value={candidate.id}>
                      {candidate.name} - {candidate.email}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tags"
                value={uploadData.tags.join(', ')}
                onChange={(e) => setUploadData({...uploadData, tags: e.target.value.split(',').map(t => t.trim())})}
                placeholder="Enter tags separated by commas"
                helperText="e.g., Python, React, AWS"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={uploadData.description}
                onChange={(e) => setUploadData({...uploadData, description: e.target.value})}
                placeholder="Brief description of the document..."
              />
            </Grid>

            {uploadProgress > 0 && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LinearProgress variant="determinate" value={uploadProgress} sx={{ flexGrow: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {uploadProgress}%
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUploadDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleFileUpload} 
            variant="contained"
            disabled={!uploadData.file || uploadProgress > 0}
          >
            Upload Document
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Document Dialog */}
      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Document Details - {selectedDocument?.fileName}
        </DialogTitle>
        <DialogContent>
          {selectedDocument && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Document Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><DocIcon /></ListItemIcon>
                    <ListItemText 
                      primary="File Name" 
                      secondary={selectedDocument.fileName} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><DocIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Type" 
                      secondary={documentTypes.find(t => t.value === selectedDocument.documentType)?.label} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><DocIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Size" 
                      secondary={selectedDocument.fileSize} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><DocIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Upload Date" 
                      secondary={selectedDocument.uploadDate} 
                    />
                  </ListItem>
                </List>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Candidate & Analysis
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><DocIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Candidate" 
                      secondary={selectedDocument.candidateName} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><DocIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Status" 
                      secondary={
                        <Chip
                          label={selectedDocument.status}
                          color={getStatusColor(selectedDocument.status)}
                          size="small"
                        />
                      } 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><DocIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Tags" 
                      secondary={
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                          {selectedDocument.tags.map((tag, index) => (
                            <Chip
                              key={index}
                              label={tag}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      } 
                    />
                  </ListItem>
                </List>
              </Grid>

              {selectedDocument.description && (
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedDocument.description}
                  </Typography>
                </Grid>
              )}

              {selectedDocument.aiAnalysis && (
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    AI Analysis
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedDocument.aiAnalysis}
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)}>Close</Button>
          <Button 
            variant="contained" 
            startIcon={<DownloadIcon />}
            onClick={() => handleDownloadDocument(selectedDocument)}
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Documents;
