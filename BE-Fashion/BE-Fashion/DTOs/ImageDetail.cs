namespace BE_Fashion.DTOs
{
    public class ImageDetail
    {
        public int ImageId { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public bool IsPrimary { get; set; }
    }
}
