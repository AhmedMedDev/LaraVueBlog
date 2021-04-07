<template>
    <div class="container">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            New Post
        </button>
        <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel" v-if="editStatus">Edit Post</h5>
                        <h5 class="modal-title" id="exampleModalLabel" v-else>Create Post</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input type="text" v-model="post.title" :class="['form-control m-1',errors.title ? 'is-invalid':'']">
                        <span v-if="errors.title" class="text-danger">{{ errors.title[0] }}</span>
                        <textarea  v-model="post.body" :class="['form-control m-1',errors.title ? 'is-invalid':'']"></textarea>
                        <span v-if="errors.body" class="text-danger">{{ errors.body[0] }}</span>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="UpdatePost" v-if="editStatus">Edit</button>
                        <button type="button" class="btn btn-primary" @click="createPost" v-else>Save Post</button>
                    </div>
                    </div>
                </div>
            </div>
        <!-- Modal -->
        <!--  -->
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card m-4" :id="'post' + aricle.id"  v-for="aricle in aricles" :key="aricle.id">
                        <div class="card-header">
                            {{aricle.title}}
                        </div>

                        <div class="card-body">
                            <p>{{aricle.body}}</p>
                            <div class="float-right">
                            <button type="button" @click="editPost(aricle)" class="btn btn-primary m-2" data-toggle="modal" data-target="#exampleModal">
                                Edit Post
                            </button>
                            <button type="button" @click="deletePost(aricle)" class="btn btn-danger" >
                                Delete Post
                            </button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        <!--  -->
    </div>
</template>
<script>
export default {
    data(){
        return{
            post:{
                id:'',
                title:'',
                body:''
            },
            editStatus:false,
            aricles:{},
            errors:[],
        }
    },
    methods:{
        
        createPost(){
            axios.post('api/posts',this.post).then(response=>{
                if(response.data.message == 'error'){
                    this.errors = response.data.message
                }else if(response.data.message == 'success'){
                    this.aricles.unshift(response.data.data)
                    Toast.fire({
                        icon: 'success',
                        title: 'Created successfully'
                    })
                    this.post={
                        id:'',
                        title:'',
                        body:''
                    },
                    this.errors = []
                    $(function(){
                        $(`.modal-backdrop`).removeClass('show')
                        $(`#exampleModal`).removeClass('show')
                    })
                }
            });
        },

        UpdatePost(post){
            axios.put('api/posts/'+this.post.id,this.post).then(response=>{
                if(response.data.message == 'error'){
                    this.errors = response.data.errors
                }else if(response.data.message == 'success'){
                    Toast.fire({
                        icon: 'success',
                        title: 'Updated successfully'
                    })
                    this.post={
                        id:'',
                        title:'',
                        body:''
                    },
                    this.errors = []

                }
            });
        },

        getPost(){
            axios.get('api/posts').then(response=>{
                this.aricles = response.data.data
            })
        },

        editPost(post){
            this.post = post;
            this.editStatus = true;
        },

        deletePost(post){

            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                axios.delete('api/posts/'+post.id)

                $(function(){
                    $(`#post${post.id}`).slideUp(600)
                })
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
            })
            
            

        }
    },
    created(){
        this.getPost()
    }
}
</script>