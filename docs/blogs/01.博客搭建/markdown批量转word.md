
# markdown批量转word
```shell
#!/bin/bash

# 设置输入文件夹路径和输出文件夹路径
input_folder="/Users/wanghaihang/Desktop/xuanmu-blogs/docs/blogs"
output_folder="/Users/wanghaihang/Desktop/百度文库上传/"

# 导出 Markdown 到 Word
find "$input_folder" -name "*.md" -print0 | while IFS= read -r -d $'\0' file; do
    # 获取输入文件的相对路径
    relative_path="${file#$input_folder}"
    
    # 构建输出文件路径
    output_file="$output_folder${relative_path%.md}.docx"
    
    # 创建输出文件的目录（如果不存在）
    mkdir -p "$(dirname "$output_file")"
    
    # 使用 pandoc 进行导出
    pandoc "$file" -o "$output_file"
done

```