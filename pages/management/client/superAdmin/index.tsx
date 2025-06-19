'use client';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
  CardMedia,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
  TextField,
  DialogActions,
  Button,
  Chip,
  Grid,
  Box,
  FormControl,
  InputAdornment,
  LinearProgress,
  CardHeader,
  Divider
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import TablePagination from '@mui/material/TablePagination';
import { HttpClient } from '@/services/http-client';
import SidebarLayout from '@/layouts/SidebarLayout';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Head from 'next/head';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { getStatusColor } from '@/helpers';
import { Pagination } from '@/constant/gagination';

const VerificationTable = () => {
  const title = 'Client Management';
  const http = new HttpClient();
  const unique = new Set();
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalItem, setTotalItem] = useState(0);
  const [datasource, setDatasource] = useState([]);
  const [selectedId, setSelectedId] = useState<any>(null);
  const [status, setStatus] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const thumbnailsRef = useRef(null);

  const visibleThumbnails = 5;

  const mergeVerificationData = (cardData, placeData) => {
    const userMap = new Map();

    [...cardData, ...placeData].forEach((item) => {
      const username = item.user.username;
      if (!userMap.has(username)) {
        userMap.set(username, {
          id: item.id,
          user: item.user,
          images: [...(item.images || [])],
          status: item.status,
          type: item.type,
          allIds: [item.id]
        });
      } else {
        const existing = userMap.get(username);
        userMap.set(username, {
          ...existing,
          images: [...existing.images, ...(item.images || [])],
          allIds: [...existing.allIds, item.id]
        });
      }
    });

    return Array.from(userMap.values());
  };

  const getVerificationData = async () => {
    const [cardRes, placeRes] = await Promise.all([
      http.get(
        `SuperAdminIdentificationCard?pageNumber=${
          pageNumber + 1
        }&pageSize=${pageSize}`
      ),
      http.get(
        `SuperAdminIdentificationPlace?pageNumber=${
          pageNumber + 1
        }&pageSize=${pageSize}`
      )
    ]);

    const merged = mergeVerificationData(
      cardRes.item.map((i) => ({ ...i, type: 'card' })),
      placeRes.item.map((i) => ({ ...i, type: 'place' }))
    );

    setDatasource(merged);
    setTotalItem(merged.length);
  };

  useEffect(() => {
    getVerificationData();
    const interval = setInterval(() => {
      getVerificationData();
    }, 1000);
    return () => clearInterval(interval);
  }, [pageNumber, pageSize]);

  const handleOpenDialog = (item: any) => {
    setSelectedId(item);
    setOpenDialog(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : selectedImages.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < selectedImages.length - 1 ? prev + 1 : 0
    );
  };

  const onStatusChange = async () => {
    if (selectedId && status) {
      await Promise.all(
        selectedId.allIds.map((id) =>
          http.put(
            `SuperAdminIdentification${
              selectedId.type === 'card' ? 'Card' : 'Place'
            }/status/${id}`,
            {
              status: status
            }
          )
        )
      );
      setOpenDialog(false);
      getVerificationData();
    }
  };

  const handleOpen = (imageUrl: string, userImages: string[]) => {
    const index = userImages.findIndex((img) => img === imageUrl);
    setSelectedImages(userImages);
    setCurrentIndex(index >= 0 ? index : 0);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getVisibleThumbnails = () => {
    let start = 0;
    let end = visibleThumbnails;

    if (currentIndex >= visibleThumbnails) {
      start = currentIndex - (visibleThumbnails - 1);
      end = currentIndex + 1;
    }

    return selectedImages.slice(start, end);
  };

  const handlePageChange = (_event: any, newPageNumber: number): void => {
    setPageNumber(newPageNumber);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPageSize(parseInt(event.target.value));
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Grid item sx={{ p: 3 }}>
        <FormControl
          variant="outlined"
          sx={{ marginBottom: 2, display: 'flex', justifyContent: 'center' }}
        >
          <TextField
            placeholder="Search username..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              )
            }}
          />
        </FormControl>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card style={{ position: 'relative' }}>
              {!datasource && (
                <LinearProgress
                  style={{ position: 'absolute', width: '100%' }}
                />
              )}
              <CardHeader title={title} />
              <Divider />
              <TableContainer style={{ height: 'calc(92vh - 298px)' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell width={12} align="right">
                        No
                      </TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datasource
                      ?.filter(
                        (item) =>
                          !searchName.trim() ||
                          item.user.username
                            .toLowerCase()
                            .includes(searchName.toLowerCase())
                      )
                      .map((item, index) => {
                        if (unique.has(item.user.username)) return null;
                        unique.add(item.user.username);
                        return (
                          <TableRow hover key={`${item.type}-${item.id}`}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.user.username}</TableCell>
                            <TableCell>
                              <CardMedia
                                component="img"
                                sx={{
                                  width: 150,
                                  height: 100,
                                  objectFit: 'cover',
                                  borderRadius: '8px',
                                  cursor: 'pointer'
                                }}
                                image={
                                  item.images?.length > 0
                                    ? item.images[0]
                                    : '/static/none_image.png'
                                }
                                alt={item.user.username}
                                onClick={() =>
                                  handleOpen(
                                    item.images?.[0],
                                    item.images || []
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={item.status}
                                color={getStatusColor(item.status)}
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Tooltip title="Edit Status" arrow>
                                <IconButton
                                  onClick={() => handleOpenDialog(item)}
                                  color="primary"
                                  size="small"
                                >
                                  <EditTwoToneIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Grid container p={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={10}>
                  <TablePagination
                    component="div"
                    count={totalItem}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={pageNumber}
                    rowsPerPage={pageSize}
                    rowsPerPageOptions={Pagination.pageSizeOptions}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Status</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Reject">Reject</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={onStatusChange} color="primary">
            Assign Status
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent sx={{ position: 'relative', textAlign: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2
            }}
          >
            <Typography variant="subtitle1">Gallery</Typography>
            <Box>
              <Typography variant="caption">
                {currentIndex + 1}/{selectedImages.length}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={selectedImages[currentIndex]}
              alt="Image"
              style={{
                maxWidth: '100%',
                height: 'auto',
                maxHeight: '50vh',
                objectFit: 'contain'
              }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 1
            }}
          >
            <IconButton onClick={handlePrev} color="primary">
              <ArrowBackIosIcon />
            </IconButton>

            <Box
              sx={{
                display: 'flex',
                gap: 1,
                overflowX: 'scroll',
                width: '100%',
                justifyContent: 'center',
                padding: '8px'
              }}
              ref={thumbnailsRef}
            >
              {getVisibleThumbnails().map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Thumbnail"
                  onClick={() => setCurrentIndex(index)}
                  style={{
                    height: 50,
                    width: 80,
                    objectFit: 'cover',
                    borderRadius: 5,
                    cursor: 'pointer',
                    border:
                      currentIndex === index ? '2px solid #ff9800' : 'none'
                  }}
                />
              ))}
            </Box>

            <IconButton onClick={handleNext} color="primary">
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

VerificationTable.getLayout = (page: React.ReactElement) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default VerificationTable;
