import status from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { BlogService } from "./blog.service";

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogService.createBlog(req);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Blog created successfully!",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const filters = req.query;
  const result = await BlogService.getAllBlogs(filters, filters);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Blogs retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const getBlogById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogService.getBlogById(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Blog retrieved successfully!",
    data: result,
  });
});

const getBlogBySlug = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await BlogService.getBlogBySlug(slug);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Blog retrieved successfully!",
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const result = await BlogService.updateBlog(req);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Blog updated successfully!",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogService.deleteBlog(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Blog deleted successfully!",
    data: result,
  });
});

const dashboardHomeData = catchAsync(async (req, res) => {
  const result = await BlogService.dashboardHomeData();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Dashboard data is get successfully!",
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  dashboardHomeData,
};
